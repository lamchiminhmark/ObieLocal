import { RECENTER_MAP } from "../types";
import { recenterMap } from "../mapActions";

describe("RECENTER_MAP action", () => {
  it("should recenter to Tappan when there's no lng and lat", () => {
    const action = recenterMap({});
    expect(action.type).toEqual(RECENTER_MAP);
    expect(action.zoom - 17.5).toBeLessThan(0.02);
    expect(action.zoom - 17.5).toBeGreaterThan(0);
    expect(action.lat - 41.2926).toBeLessThan(0.0002);
    expect(action.lat - 41.2926).toBeGreaterThan(0);
    expect(action.lng + 82.2183).toBeGreaterThan(-0.0002);
    expect(action.lng + 82.2183).toBeLessThan(0);
  });

  it("should recenter to event's lng and lat", () => {
    const action = recenterMap({lat: 1.2424, lng: -2.1212});
    expect(action.type).toEqual(RECENTER_MAP);
    expect(action.zoom - 17.5).toBeLessThan(0.02);
    expect(action.zoom - 17.5).toBeGreaterThan(0);
    expect(action.lat - 1.2424).toBeLessThan(0.0002);
    expect(action.lat - 1.2424).toBeGreaterThan(0);
    expect(action.lng + 2.1212).toBeGreaterThan(-0.0002);
    expect(action.lng + 2.1212).toBeLessThan(0);
  });
});