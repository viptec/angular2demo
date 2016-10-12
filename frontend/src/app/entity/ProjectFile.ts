export class ProjectFile {
    projectId: string;
    quickcheck: QuickCheck;    
    building: Building;
    installation: Installation;
    buildingMods : BuildingMods;
    finance : Finance;
}


export class QuickCheck {
    modernizationTarget: ModernizationTarget;
    includeBuildingModernization : boolean;
    includeWarmWater : boolean;
}

export class Building {
    numberOfPersons : number;
    buildingYearOfConstruction: number;
    livingSpace : number;
    buildingType : BuildingType;
    postalCode : string;
    buildingLength : number;
    buildingWidth : number;
    numberOfLevels : number;
    levelHeight : number;
    windowTypeId : number;
    windowArea : number;
    hasCellar : boolean;
    hasHeatedCellar : boolean
    hasRoof : boolean;
    hasHeatedRoof: boolean;
    thermalRecovery: number;
    cellarSoilTemperature: number;
    ventilationAmount: number;
    roofType : RoofType;
    roofJambWallHeight: number;
    roofSlope1 : number;
    roofSlope2 : number;
    roofH1 : number;
    roofH2 : number;
    roofS1 : number;
    outsideTemperature : number;
    insideTemperature : number;
    heatingLimitTemperature : number;
    consumptionProfile : ConsumptionProfile;
    roofInsulation : number;
    upperFloorInsulation : number;
    wallInsulation : number;
    cellarInsulation : number;
    buildingLocation : BuildingLocation;
}

export class Installation {
    installationConsumption : number;
    installationType : InstallationType;
    energySource : EnergySource;
    yearOfConstruction : number;
    nominalPower : number;
    exhaustGasLosses : number;
    isLowTemperature : boolean;
}

export class Finance {
    public energyCostIncrease : number;
    public totalInvestments : number;
    public foreignCapital : number;
    public foreignCapitalAnnuity : number;
    public foreignCaptialInterestRate : number;
    public numberOfYears : number;
    public ownCapital : number;
    public roofInsulation : number;
    public upperFloorInsulation : number;
    public wallInsulation : number;
    public cellarInsulation : number;
    public installation : number;
    public window : number;
}


export class BuildingMods {
    public roofInsulation : number;
    public upperFloorInsulation : number;
    public wallInsulation : number;
    public cellarInsulation : number;
    public windowTypeId : number;
}

export enum ModernizationTarget {
    USAGE,//sole WP VitoCal 300-G
    CO2,// Vitoligno
    HEATING,
    REGENERATIVE,//WP-Split und Solaranlge nur WW + Altkessel
    INDEPENDENT
}

export enum EnergySource {
    HEATING_OIL,
    GAS,
    ELECTRICITY,
    ELECTRICITY_HEATPUMP,
    CHP_GAS,
    WOOD,
    ELECTRICITY_PRODUCED,
    ELECTRICITY_OWN_NEEDS,
    ELECTRICITY_FEED
}

export enum RoofType {
    SADDLE,
    HALF_HIPPED,
    HIPPED,
    FLAT,
    SINGLE_PITCH
}

export enum BuildingType {
    ONE_FAMILY_HOUSE,
    MULTI_FAMILY_HOUSE,
    NOT_LIVING_BUILDING,
    INDUSTRY_BUILDING
}

export enum BuildingLocation {
    DETACHED,
    CORNER,
    MIDDLE
}

export enum ConsumptionProfile {
    HEAT_WITH_NOCTURNAL_FALL,
    HEAT_WITH_DAY_AND_NOCTURNAL_FALL,
    DEFAULT_MULTI_FAMILY_HOUSE,
    OFFICE,
    HOTEL,
    SCHOOL,
    HOSPITAL,
    INDUSTRY
}

export enum InstallationType{
    CONDENSING_BOILER,
    SOLID_FUEL_BOILER,
    GAS_SPECIAL_BOILER,
    FAN_BOILER,
    FAN_BOILER_WITH_CHANGED_BURNER,
    CIRCULATION_WATER_BOILER,
    TWO_FUEL_CHANGE_BOILER
}
