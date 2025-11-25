import useBuildStore from "@/lib/useBuildStore";

const mockCpu = {
  "cpuId": 1,
  "series": "Intel Core Ultra 9",
  "microarchitecture": "Arrow Lake",
  "coreFamily": "Arrow Lake",
  "socket": "LGA1851",
  "coreCount": 24,
  "threadCount": 24,
  "performanceCoreClock": 3.7,
  "performanceCoreBoostClock": 5.7,
  "efficiencyCoreClock": 3.2,
  "efficiencyCoreBoostClock": 4.6,
  "lTwoCache": 40,
  "lThreeCache": 36,
  "tdp": 125,
  "maxTurboPower": 250,
  "integrated": "Intel Xe",
  "memoryMax": 192,
  "lithography": 3,
  "includedCooler": 0,
  "multithreading": 0
};

const mockMotherboard = {
  "motherboardId": 13,
  "socket": "LGA1851",
  "formFactor": "ATX",
  "chipset": "Intel Z890",
  "memoryMax": 256,
  "memoryType": "DDR5",
  "memorySlot": 4,
  "color": "Black / Silver",
  "pcieSixteenSlot": 1,
  "pcieEightSlot": 0,
  "pcieFourSlot": 2,
  "pcieOneSlot": 1,
  "pcieSlot": 0,
  "sataSlot": 4,
  "mTwoSlot": 4,
  "onboardEthernet": "1 x 2.5 Gb/s (Realtek Dragon RTL8125BG)",
  "onboardVideo": "Depends on CPU",
  "usbTwoHeader": 2,
  "usbTwoHeaderSinglePort": 0,
  "usbThreeTwoGenOneHeader": 2,
  "usbThreeTwoGenTwoHeader": 2,
  "usbThreeTwoGenTwoByTwoHeader": 1,
  "wirelessNetworking": "Wi-Fi 6E",
  "raidSupport": 0,
  "backConnectors": 0
};

const mockMemory1 = {
  "memoryId": 2,
  "memoryType": "DDR5",
  "speed": 6000,
  "casLatency": 30,
  "trueLatency": 10,
  "capacity": 64,
  "modules": 2,
  "pricePerGig": 3.094,
  "formFactor": "288-pin DIMM (DDR5)",
  "color": "Black",
  "voltage": 1.4,
  "heatSpreader": 1
};

const mockMemory2 = {
  "memoryId": 478,
  "memoryType": "DDR4",
  "speed": 3600,
  "casLatency": 18,
  "trueLatency": 10,
  "capacity": 64,
  "modules": 2,
  "pricePerGig": 6.234,
  "formFactor": "288-pin DIMM (DDR4)",
  "color": "Black / Silver",
  "voltage": 1.35,
  "heatSpreader": 1
};

const mockStorage1 = {
  "storageId": 7,
  "capacity": 4000,
  "formFactor": "M.2-2280",
  "type": "SSD",
  "pricePerGig": 0.112,
  "interface": "M.2 PCIe 5.0 X4",
  "nvme": 1,
};

const mockStorage2 = {
  "storageId": 92,
  "capacity": 6000,
  "formFactor": "3.5",
  "type": "7200 RPM",
  "pricePerGig": 0.022,
  "interface": "SATA 6.0 Gb/s",
  "nvme": 0,
};

const mockVideoCard = {
  "videoCardId": 199,
  "chipset": "GeForce RTX 4090",
  "memory": 24,
  "memoryType": "GDDR6X",
  "coreClock": 2520,
  "boostClock": 2535,
  "effectiveMemoryClock": null,
  "color": "Silver / White",
  "frameSync": "G-Sync",
  "length": 342,
  "tdp": 450,
  "caseSlotWidth": 2,
  "totalSlotWidth": 4,
  "coolingFan": 3,
  "externalPower": "1 PCIe 16-pin",
  "dpOutput": 3,
  "hdmiOutput": 1
};

const mockCpuCooler = {
  "cpuCoolerId": 70,
  "fanRPM": 2100,
  "noiseLevel": 34,
  "color": "Black",
  "height": null,
  "radiatorSize": 360
};

const mockPowerSupply = {
  "psuId": 44,
  "formFactor": "ATX",
  "efficiency": "80+ Platinum",
  "modularity": "Fully-modular",
  "wattage": 1200,
  "length": 200,
  "color": "Black",
  "atxFourConn": 0,
  "epsEightConn": 2,
  "pcieTwelvePlusFourConn": 0,
  "pcieTwelveConn": 0,
  "pcieEightConn": 0,
  "pcieSixPlusTwoConn": 8,
  "pcieSixConn": 0,
  "sataConn": 16,
  "molexFourConn": 8
};


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
  /*
  it("should add a Memory to state", () => {
    useBuildStore.getState().addMemory(mockMemory);

    expect(useBuildStore.getState().memory).toEqual(mockMemory);
  });
  */
  /*
   it("should add a Storage to state", () => {
     useBuildStore.getState().addStorage(mockStorage);
 
     expect(useBuildStore.getState().storage).toEqual(mockStorage);
   });
   */
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
  /*
  it("should remove a Memory from state", () => {
    useBuildStore.getState().addMemory(mockMemory);
    useBuildStore.getState().removeMemory();

    expect(useBuildStore.getState().memory).toEqual([]);
  });
  */
  /*
  it("should remove a Storage from state", () => {
    useBuildStore.getState().addStorage(mockStorage);
    useBuildStore.getState().removeStorage();

    expect(useBuildStore.getState().storage).toEqual([]);
  });
  */
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
