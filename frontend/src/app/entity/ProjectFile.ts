export class ProjectFile {
    projectId: string;
    quickcheck: QuickCheck;
}


export class QuickCheck {
    modernizationTarget: ModernizationTarget;
}

export enum ModernizationTarget {
    USAGE,//sole WP VitoCal 300-G
    CO2,// Vitoligno
    HEATING,
    REGENERATIVE,//WP-Split und Solaranlge nur WW + Altkessel
    INDEPENDENT
}