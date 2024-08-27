import { CategoryOrTopicValidationError } from "../error/customError";

/**
 * Validates category or topic parameter.
 *
 * @param {string} categoryOrTopic - The category or topic to validate.
 * @throws {CategoryOrTopicValidationError} If the category or topic property is missing or invalid, or if the categoryOrTopic parameter is invalid.
 * @returns {void}
 */

export default function parameterValidator(categoryOrTopic: string): void {
    if (!categoryOrTopic || typeof categoryOrTopic !== "string")
        throw new CategoryOrTopicValidationError("Invalid parameter : 'categoryOrTopic' parameter is not valid");
    if (categoryOrTopic.length < 1)
        throw new CategoryOrTopicValidationError("Invalid parameter : 'categoryOrTopic' parameter is missing(empty)");
}
