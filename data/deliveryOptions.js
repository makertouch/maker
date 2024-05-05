export const deliveryOptions = [{
  id: `1`,
  deliveryDays: `7`,
  priceCents: 0
}, {
id: `2`,
deliveryDays: `3`,
priceCents: 499
}, {
  id: `3`,
  deliveryDays: `1`,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
	
deliveryOptions.forEach((option) => {
	if (option.id === deliveryOptionId) {
	  deliveryOption = option;
	}
});

return deliveryOption;
}

export function getDeliveryOptionDate(deliveryOption) {
  
  let deliveryDate = dayjs();
  let remainingDays = deliveryOption.deliveryDays;
  
  while (remainingDays > 0) {  // All the scope exists as long as remainingDays > 0
    deliveryDate = deliveryDate.add(1, `day`);

    if (isWeekend(deliveryDate)) {
      remainingDays++;
    } else {
      remainingDays--;
    }
  }

	const dateString = deliveryDate.format(`dddd, MMMM D`);
  return dateString;
}

function isWeekend(date) {
  const dayOfweek = date.format(`dddd`);
  return dayOfweek === `Saturday` || dayOfweek === `Sunday`;
}
