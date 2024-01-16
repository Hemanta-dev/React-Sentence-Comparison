export function patienceDiff(aLines, bLines, diffPlusFlag) {
    
    function findUnique(arr, lo, hi) {
        
        const lineMap = new Map();

        for (let i = lo; i <= hi; i++) {

            let line = arr[i];

            if (lineMap.has(line)) {

                lineMap.get(line).count++;
                lineMap.get(line).index = i;

            } else {

                lineMap.set(line, {
                    count: 1,
                    index: i
                });

            }

        }

        lineMap.forEach((val, key, map) => {

            if (val.count !== 1) {

                map.delete(key);

            } else {

                map.set(key, val.index);

            }

        });

        return lineMap;

    }


    function uniqueCommon(aArray, aLo, aHi, bArray, bLo, bHi) {

        const ma = findUnique(aArray, aLo, aHi);
        const mb = findUnique(bArray, bLo, bHi);

        ma.forEach((val, key, map) => {

            if (mb.has(key)) {

                map.set(key, {
                    indexA: val,
                    indexB: mb.get(key)
                });

            } else {

                map.delete(key);

            }

        });

        return ma;

    }

    function longestCommonSubsequence(abMap) {

        const ja = [];


        abMap.forEach((val, key, map) => {

            let i = 0;

            while (ja[i] && ja[i][ja[i].length - 1].indexB < val.indexB) {

                i++;

            }

            if (!ja[i]) {

                ja[i] = [];

            }

            if (0 < i) {

                val.prev = ja[i - 1][ja[i - 1].length - 1];

            }

            ja[i].push(val);

        });


        let lcs = [];

        if (0 < ja.length) {

            let n = ja.length - 1;
            lcs = [ja[n][ja[n].length - 1]];

            while (lcs[lcs.length - 1].prev) {

                lcs.push(lcs[lcs.length - 1].prev);

            }

        }

        return lcs.reverse();

    }


    const result = [];
    let deleted = 0;
    let inserted = 0;


    const aMove = [];
    const aMoveIndex = [];
    const bMove = [];
    const bMoveIndex = [];


    function addToResult(aIndex, bIndex) {

        if (bIndex < 0) {

            aMove.push(aLines[aIndex]);
            aMoveIndex.push(result.length);
            deleted++;

        } else if (aIndex < 0) {

            bMove.push(bLines[bIndex]);
            bMoveIndex.push(result.length);
            inserted++;

        }

        result.push({
            line: 0 <= aIndex ? aLines[aIndex] : bLines[bIndex],
            aIndex: aIndex,
            bIndex: bIndex,
        });

    }



    function addSubMatch(aLo, aHi, bLo, bHi) {


        while (aLo <= aHi && bLo <= bHi && aLines[aLo] === bLines[bLo]) {

            addToResult(aLo++, bLo++);

        }



        let aHiTemp = aHi;

        while (aLo <= aHi && bLo <= bHi && aLines[aHi] === bLines[bHi]) {

            aHi--;
            bHi--;

        }



        const uniqueCommonMap = uniqueCommon(aLines, aLo, aHi, bLines, bLo, bHi);

        if (uniqueCommonMap.size === 0) {

            while (aLo <= aHi) {

                addToResult(aLo++, - 1);

            }

            while (bLo <= bHi) {

                addToResult(- 1, bLo++);

            }

        } else {

            recurseLCS(aLo, aHi, bLo, bHi, uniqueCommonMap);

        }


        while (aHi < aHiTemp) {

            addToResult(++aHi, ++bHi);

        }

    }



    function recurseLCS(aLo, aHi, bLo, bHi, uniqueCommonMap) {

        const x = longestCommonSubsequence(uniqueCommonMap || uniqueCommon(aLines, aLo, aHi, bLines, bLo, bHi));

        if (x.length === 0) {

            addSubMatch(aLo, aHi, bLo, bHi);

        } else {

            if (aLo < x[0].indexA || bLo < x[0].indexB) {

                addSubMatch(aLo, x[0].indexA - 1, bLo, x[0].indexB - 1);

            }

            let i;
            for (i = 0; i < x.length - 1; i++) {

                addSubMatch(x[i].indexA, x[i + 1].indexA - 1, x[i].indexB, x[i + 1].indexB - 1);

            }

            if (x[i].indexA <= aHi || x[i].indexB <= bHi) {

                addSubMatch(x[i].indexA, aHi, x[i].indexB, bHi);

            }

        }

    }

    recurseLCS(0, aLines.length - 1, 0, bLines.length - 1);

    if (diffPlusFlag) {

        return {
            lines: result,
            lineCountDeleted: deleted,
            lineCountInserted: inserted,
            lineCountMoved: 0,
            aMove: aMove,
            aMoveIndex: aMoveIndex,
            bMove: bMove,
            bMoveIndex: bMoveIndex,
        };

    }

    return {
        lines: result,
        lineCountDeleted: deleted,
        lineCountInserted: inserted,
        lineCountMoved: 0,
    };

}


function patienceDiffPlus(aLines, bLines) {

    const difference = patienceDiff(aLines, bLines, true);

    let aMoveNext = difference.aMove;
    let aMoveIndexNext = difference.aMoveIndex;
    let bMoveNext = difference.bMove;
    let bMoveIndexNext = difference.bMoveIndex;

    delete difference.aMove;
    delete difference.aMoveIndex;
    delete difference.bMove;
    delete difference.bMoveIndex;

    let lastLineCountMoved;

    do {

        let aMove = aMoveNext;
        let aMoveIndex = aMoveIndexNext;
        let bMove = bMoveNext;
        let bMoveIndex = bMoveIndexNext;

        aMoveNext = [];
        aMoveIndexNext = [];
        bMoveNext = [];
        bMoveIndexNext = [];

        let subDiff = patienceDiff(aMove, bMove);

        lastLineCountMoved = difference.lineCountMoved;

        subDiff.lines.forEach((v, i) => {

            if (0 <= v.aIndex && 0 <= v.bIndex) {

                difference.lines[aMoveIndex[v.aIndex]].moved = true;
                difference.lines[bMoveIndex[v.bIndex]].aIndex = aMoveIndex[v.aIndex];
                difference.lines[bMoveIndex[v.bIndex]].moved = true;
                difference.lineCountInserted--;
                difference.lineCountDeleted--;
                difference.lineCountMoved++;

            } else if (v.bIndex < 0) {

                aMoveNext.push(aMove[v.aIndex]);
                aMoveIndexNext.push(aMoveIndex[v.aIndex]);

            } else {

                bMoveNext.push(bMove[v.bIndex]);
                bMoveIndexNext.push(bMoveIndex[v.bIndex]);

            }

        });

    } while (0 < difference.lineCountMoved - lastLineCountMoved);

    return difference;

}
