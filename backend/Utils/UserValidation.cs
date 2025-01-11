using System.Net.Mail;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Utils;

public class ValidationException : Exception
{
    public ValidationException(string message) : base(message)
    {
    }
}

public class UserValidation
{
    private const int MaxEmailLength = 255;
    private const int MaxUsernameLength = 32;
    private const int MaxPasswordLength = 64;
    private const int MinPasswordLength = 8;

    private const string ErrInvalidPasswordLength = "Password must be between 8 and 64 characters long";
    private const string ErrEmailTooLong = "Email must be less than 255 characters long";
    private const string ErrInvalidEmail = "Invalid email";
    private const string ErrEmptyUsername = "Username cannot be empty";
    private const string ErrUsernameTooLong = "Username must be less than 32 characters long";
    private const string ErrInvalidCharacters = "Username can only contain letters, numbers, and underscores";
    private const string ErrInvalidRole = "Invalid role";

    public static void ValidateUser(string username, string email, string password, string role)
    {
        ValidatePassword(password);
        ValidateEmail(email);
        ValidateUsername(username);
        ValidateRole(role);
    }

    public static void ValidatePassword(string password)
    {
        if (password.Length < MinPasswordLength || password.Length > MaxPasswordLength)
        {
            throw new ValidationException(ErrInvalidPasswordLength);
        }
    }

    public static void ValidateEmail(string email)
    {
        if (email.Length > MaxEmailLength)
        {
            throw new ValidationException(ErrEmailTooLong);
        }

        try
        {
            var mailAddress = new MailAddress(email);
        }
        catch
        {
            throw new ValidationException(ErrInvalidEmail);
        }
    }

    public static void ValidateUsername(string username)
    {
        if (string.IsNullOrEmpty(username))
        {
            throw new ValidationException(ErrEmptyUsername);
        }

        if (username.Length > MaxUsernameLength)
        {
            throw new ValidationException(ErrUsernameTooLong);
        }

        // Check if username only contains letters, numbers, and underscores
        if (!username.All(c => char.IsLetterOrDigit(c) || c == '_'))
        {
            throw new ValidationException(ErrInvalidCharacters);
        }
    }

    public static void ValidateRole(string userRole)
    {
        if (!Enum.TryParse(userRole, out Models.Role role))
        {
            throw new ValidationException(ErrInvalidRole);
        }
    }
}