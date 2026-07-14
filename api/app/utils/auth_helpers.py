"""
app/utils/auth_helpers.py

Shared helper for resolving the current authenticated user from a JWT.
Use this in every protected route instead of manually doing
UUID(get_jwt_identity()) — it guards against stale/orphaned tokens
that reference a user_id no longer present in the database (e.g.
after a DB reset), which otherwise causes an unhandled
ForeignKeyViolation -> 500 the moment you try to INSERT anything
tied to that user_id.

Usage in a route:

    from ..utils.auth_helpers import get_current_user_or_401

    @some_bp.route("/...", methods=["POST"])
    @jwt_required()
    def some_view():
        user, error_response = get_current_user_or_401()
        if error_response:
            return error_response
        # ... use user.id / user safely from here on
"""
from uuid import UUID
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from ..models.user import User


def get_current_user_or_401():
    """
    Resolves the JWT identity to a real User row.
    Returns (user, None) on success, or (None, flask_response) on failure.
    Caller should immediately `return error_response` if it's not None.
    """
    identity = get_jwt_identity()
    if not identity:
        return None, (jsonify({"error": "Not authenticated"}), 401)

    try:
        user_id = UUID(identity)
    except (ValueError, AttributeError, TypeError):
        return None, (jsonify({"error": "Invalid session, please log in again"}), 401)

    user = User.query.get(user_id)
    if not user:
        # Token is well-formed but references a user that no longer
        # exists in the DB (stale cookie after a DB reset/reseed, or
        # the account was deleted). Tell the frontend to force a re-login
        # rather than letting the DB throw a ForeignKeyViolation later.
        return None, (jsonify({"error": "Session invalid, please log in again"}), 401)

    return user, None