export enum AmidaPart {
    U_TO_B,
    // L_TO_R,
    U_TO_BL,
    U_TO_RB,
    BOLD_U_TO_B,
    // BOLD_L_TO_R,
    U_TO_B_BOLD_B_TO_L,
    U_TO_B_BOLD_L_TO_U,
    U_TO_B_BOLD_R_TO_B,
    U_TO_B_BOLD_U_TO_R,
}

enum patternGenerationState {
    VERTICAL_OR_RIGHT_ONLY,
    LEFT_ONLY,
    VERTICAL_ONLY,
}

export function GetAmidaPattern(nCols: number, nRows: number): AmidaPart[][] {
    let state: patternGenerationState = patternGenerationState.VERTICAL_OR_RIGHT_ONLY;
    const pattern: AmidaPart[][] = [];

    for (let r = 0; r < nRows; r++) {
        pattern[r] = [];
        for (let c = 0; c < nCols; c++) {
            let prevPart: AmidaPart | null = null;
            switch (state) {
                case patternGenerationState.VERTICAL_OR_RIGHT_ONLY:
                    prevPart = getRandomPartIndex(
                        AmidaPart.U_TO_B,
                        AmidaPart.U_TO_RB,
                    );
                    pattern[r][c] = prevPart;
                    if (prevPart === AmidaPart.U_TO_RB) {
                        state = patternGenerationState.LEFT_ONLY;
                    } else if (c === nCols - 2) {
                        // 最右列の一つ手前なら次は必ず縦棒
                        state = patternGenerationState.VERTICAL_ONLY;
                    }
                    break;
                case patternGenerationState.LEFT_ONLY:
                    pattern[r][c] = getRandomPartIndex(
                        AmidaPart.U_TO_BL,
                    );
                    if (c === nCols - 2) {
                        // 最右列の一つ手前なら次は必ず縦棒
                        state = patternGenerationState.VERTICAL_ONLY;
                    } else {
                        state = patternGenerationState.VERTICAL_OR_RIGHT_ONLY;
                    }
                    break;
                case patternGenerationState.VERTICAL_ONLY:
                    pattern[r][c] = getRandomPartIndex(
                        AmidaPart.U_TO_B,
                    );
                    state = patternGenerationState.VERTICAL_OR_RIGHT_ONLY;
                    break;
            }
        }
    }

    return pattern;
}

// 渡されたallowedPartsの中からランダムに1つ選んで返す。
function getRandomPartIndex(...allowedParts: AmidaPart[]): AmidaPart {
    const rand = Math.floor(Math.random() * allowedParts.length);
    return allowedParts[rand];
}
