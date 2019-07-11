const DEFAULT_MEAL = 4;

export const getDefaultMealData = () => {
  const days = [
    ["Monday", 0],
    ["Tuesday", 1],
    ["Wednesday", 2],
    ["Thursday", 3],
    ["Friday", 4],
    ["Saturday", 5]
  ];

  return days.map(day => {
    return {
      key: day[1],
      quantity: 1,
      display: day[0],
      extras: [],
      dishType: DEFAULT_MEAL
    };
  });
};

export const getDefaultRestrictionData = () => {
  const restrictions = [
    [0, "Meal Options"],
    [1, "Meat Restrictions"],
    [2, "Vegetable Restrictions"],
    [3, "Fruit Restrictions"],
    [4, "Sandwich Restrictions"],
    [5, "Dessert Restrictions"],
    [6, "Soup Restrictions"]
  ];

  return restrictions.map(restriction => {
    return {
      key: restriction[0],
      display: restriction[1],
      restrictionOptions: []
    };
  });
};

export const getDefaultDetailData = () => {
  return {
    address: "",
    phone: "",
    email: "",
    title: "",
    firstName: "",
    lastName: "",
    latitude: "",
    longitude: "",
    notes: ""
  };
};
