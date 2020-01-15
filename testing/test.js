let earth = {
  isRound: true,
  numFromSun: 3,
  color: "brown",
  area: {
    width: 40,
    height: 60
  }
};

describe("Game", function() {
  it("is round", function() {
    expect(earth.isRound).toBe(true);
  });
  it("num from circle is 3", function() {
    expect(earth.numFromSun).toBe(3);
  });
  it("color is brown", function() {
    expect(earth.color).toBe("brown");
  });
  it("It should make noise", function() {
    expect(noise).toBe(true);
  });
});
