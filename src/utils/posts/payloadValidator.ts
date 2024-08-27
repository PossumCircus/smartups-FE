import { PayloadValidationError } from "../error/customError";
import { PostDataType } from "../../types/postsType";

/**
 * Validates the payload data.
 *
 * @param {Data} data - The data object containing the payload to validate.
 * @throws {PayloadValidationError} If the payload property is missing or invalid, or if the categoryOrTopic parameter is invalid.
 * @returns {void}
 */

export default function payloadValidator(data : PostDataType[] | PostDataType): void {
  if (!data)
    throw new PayloadValidationError("No field : 'payload' property is missing(empty)");
  if (!Array.isArray(data))
    throw new PayloadValidationError("Invalid field : 'payload' property is not an array");
}
