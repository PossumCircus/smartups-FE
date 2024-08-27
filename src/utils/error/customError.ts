/**
 * Custom error class for payload validation errors.
 *
 * @extends {Error}
 */

export class PayloadValidationError extends Error {
    /**
   * Creates an instance of PayloadValidationError.
   *
   * @param {string} message - The error message.
   */
    constructor(message: string) {
        super(message);
        this.name = "PayloadValidationError";
        Object.setPrototypeOf(this, PayloadValidationError.prototype); // Ensure the correct prototype chain
    }
}

export class CategoryOrTopicValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ParameterError";
        Object.setPrototypeOf(this, CategoryOrTopicValidationError.prototype);
    }
}

/**
 * Example Usage
 *
 * 
 try {
    throw new PayloadValidationError("This is a validation error");
} catch (error) {
    if (error instanceof PayloadValidationError) {
        console.error(error.name); // ValidationError
        console.error(error.message); // This is a validation error
    } else {
        console.error("Unknown error:", error);
    }
}
 */
