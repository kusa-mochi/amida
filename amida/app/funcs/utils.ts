export enum AmidaPart {
    U_TO_B,
    L_TO_R,
    U_TO_BL,
    U_TO_RB,
    BOLD_U_TO_B,
    BOLD_L_TO_R,
    U_TO_B_BOLD_B_TO_L,
    U_TO_B_BOLD_L_TO_U,
    U_TO_B_BOLD_R_TO_B,
    U_TO_B_BOLD_U_TO_R,
}

enum patternGenerationState {
    LINE_START,
    CAN_L_R,
    LINE_END,
}

export function GetAmidaPattern(nCols: number, nRows: number): AmidaPart[] {
    let state: patternGenerationState = patternGenerationState.LINE_START;
}
