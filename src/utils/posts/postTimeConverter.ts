/**
 * Converts a given date string or timestamp to a formatted string in Korean time (Asia/Seoul).
 *
 * @param {string } createdAtProp - The date string or timestamp to convert.
 * @returns {string} - The formatted date string in Korean time.
 * @throws {Error} - Throws an error if the input type is not a string or number.
 */
import { parseISO, differenceInHours, format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function postTimeConverter(createdAtProp: string): string {
  const date = parseISO(createdAtProp);
  
  const hoursDifference = differenceInHours(new Date(), date);

  let postCreatedAt;

  if (hoursDifference > 24) {
    postCreatedAt = format(date, 'yyyy년 MM월 dd일', { locale: ko }); // 24시간이 지난 경우: 년, 월, 일만 출력
  } else {
    postCreatedAt = format(date, "HH시 mm분 ss초", { locale: ko }); // 24시간 이내인 경우: 상대적 시간 출력
  }

  return postCreatedAt;
}
