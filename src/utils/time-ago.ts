import { formatDistanceStrict } from "date-fns";
import format from "date-fns/format";

export const timeAgoText = (time: string) => {
  const distance = formatDistanceStrict(new Date(time), new Date());

  const [amount, unit] = distance.split(" ");

  if (unit.includes("second")) {
    return "Дөнгөж сая";
  }

  if (unit.includes("minute")) {
    return `${amount} минутын өмнө`;
  }

  if (unit.includes("hour")) {
    return `${amount} цагын өмнө`;
  }

  if (unit.includes("day")) {
    return `${amount} өдрийн өмнө`;
  }

  return format(new Date(time), "yyyy-MM-dd");
};