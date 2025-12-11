import useBuildStore from "@/lib/useBuildStore";
import {
  mockCpu,
  mockMotherboard,
  mockMemory1,
  mockMemory2,
  mockStorage1,
  mockStorage2,
  mockVideoCard,
  mockCpuCooler,
  mockPowerSupply,
} from "@/lib/data/mock-parts";

describe("useBuildStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useBuildStore.getState().clearBuild();
  });

  it("should intialize with empty state for all PC parts", () => {
    expect(useBuildStore.getState().cpu).toEqual({});
    expect(useBuildStore.getState().motherboard).toEqual({});
    expect(useBuildStore.getState().memory).toEqual([]);
    expect(useBuildStore.getState().storage).toEqual([]);
    expect(useBuildStore.getState().videoCard).toEqual({});
    expect(useBuildStore.getState().cpuCooler).toEqual({});
    expect(useBuildStore.getState().powerSupply).toEqual({});
  });

  it("should add a CPU to state", () => {
    useBuildStore.getState().addCpu(mockCpu);

    expect(useBuildStore.getState().cpu).toEqual(mockCpu);
  });

  it("should add a Motherboard to state", () => {
    useBuildStore.getState().addMotherboard(mockMotherboard);

    expect(useBuildStore.getState().motherboard).toEqual(mockMotherboard);
  });

  it("should add 2 Memory parts to state", () => {
    useBuildStore.getState().addMemory(mockMemory1);
    useBuildStore.getState().addMemory(mockMemory2);

    expect(useBuildStore.getState().memory).toEqual([mockMemory1, mockMemory2]);
  });

  it("should add 2 Storage parts to state", () => {
    useBuildStore.getState().addStorage(mockStorage1);
    useBuildStore.getState().addStorage(mockStorage2);

    expect(useBuildStore.getState().storage).toEqual([mockStorage1, mockStorage2]);
  });

  it("should add a Video Card to state", () => {
    useBuildStore.getState().addVideoCard(mockVideoCard);

    expect(useBuildStore.getState().videoCard).toEqual(mockVideoCard);
  });

  it("should add a CPU Cooler to state", () => {
    useBuildStore.getState().addCpuCooler(mockCpuCooler);

    expect(useBuildStore.getState().cpuCooler).toEqual(mockCpuCooler);
  });

  it("should add a Power Supply to state", () => {
    useBuildStore.getState().addPowerSupply(mockPowerSupply);

    expect(useBuildStore.getState().powerSupply).toEqual(mockPowerSupply);
  });

  it("should remove a CPU from state", () => {
    useBuildStore.getState().addCpu(mockCpu);
    useBuildStore.getState().removeCpu();

    expect(useBuildStore.getState().cpu).toEqual({});
  });

  it("should remove a Motherboard from state", () => {
    useBuildStore.getState().addMotherboard(mockMotherboard);
    useBuildStore.getState().removeMotherboard();

    expect(useBuildStore.getState().motherboard).toEqual({});
  });

  it("should remove a specific Memory part from state", () => {
    useBuildStore.getState().addMemory(mockMemory1);
    useBuildStore.getState().addMemory(mockMemory2);
    useBuildStore.getState().removeMemory(1); // remove mockMemory2

    expect(useBuildStore.getState().memory).toEqual([mockMemory1]);
  });

  it("should remove a specific Storage part from state", () => {
    useBuildStore.getState().addStorage(mockStorage1);
    useBuildStore.getState().addStorage(mockStorage2);
    useBuildStore.getState().removeStorage(0); // remove mockStorage1

    expect(useBuildStore.getState().storage).toEqual([mockStorage2]);
  });

  it("should remove a Video Card from state", () => {
    useBuildStore.getState().addVideoCard(mockVideoCard);
    useBuildStore.getState().removeVideoCard();

    expect(useBuildStore.getState().videoCard).toEqual({});
  });

  it("should remove a CPU Cooler from state", () => {
    useBuildStore.getState().addCpuCooler(mockCpuCooler);
    useBuildStore.getState().removeCpuCooler();

    expect(useBuildStore.getState().cpuCooler).toEqual({});
  });

  it("should remove a Power Supply from state", () => {
    useBuildStore.getState().addPowerSupply(mockPowerSupply);
    useBuildStore.getState().removePowerSupply();

    expect(useBuildStore.getState().powerSupply).toEqual({});
  });
});
