let earth = {
  isRound: true,
  numFromSun: 3,
  color: "brown",
  area: {
    width: 40,
    height: 60
  }
};

describe("Earth", function() {
  it("is round", function() {
    expect(earth.isRound).toBe(true);
  });
  it("num from circle is 3", function() {
    expect(earth.numFromSun).toBe(3);
  });
  it("color is brown", function() {
    expect(earth.color).toBe("brown");
  });
  it("width of area is 40", function() {
    expect(earth.area.width).toBe(40);
  });
});
