import { animated, useSpring } from '@react-spring/web';
import { Action } from "../reducer/action";
import { Backing, Card } from "../gameCore/card";

interface CardViewProps {
    card: Card;
    dispatch: React.Dispatch<Action>;
    isLatestFlip: boolean;
    isPreviousFlip: boolean;
}
export function CardView({ card, dispatch, isLatestFlip, isPreviousFlip }: CardViewProps): JSX.Element {
    //SVGs generated with https://svgwave.in/
    const desertWaves = <svg width="100%" height="100%" id="svg" viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg"><path d="M 0,400 C 0,400 0,80 0,80 C 76,81 152,83 242,76 C 331,68 435,52 508,60 C 580,67 621,99 693,101 C 764,102 867,72 949,71 C 1030,69 1092,96 1171,103 C 1249,109 1344,94 1440,80 C 1440,80 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#fcb900" fillOpacity="0.265"></path><path d="M 0,400 C 0,400 0,160 0,160 C 80,171 160,182 240,175 C 319,167 399,139 490,142 C 580,144 681,176 748,177 C 814,177 848,146 930,143 C 1011,139 1142,162 1236,170 C 1329,177 1384,168 1440,160 C 1440,160 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#fcb900" fillOpacity="0.4"></path><path d="M 0,400 C 0,400 0,240 0,240 C 66,249 133,258 203,251 C 272,244 345,221 437,215 C 528,208 640,220 725,226 C 809,231 866,232 947,239 C 1027,245 1130,256 1216,257 C 1301,258 1370,249 1440,240 C 1440,240 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#fcb900" fillOpacity="0.53"></path><path d="M 0,400 C 0,400 0,320 0,320 C 84,314 168,309 257,305 C 345,300 439,295 522,301 C 604,306 676,321 748,318 C 819,314 889,293 967,299 C 1044,304 1128,335 1209,343 C 1289,350 1364,335 1440,320 C 1440,320 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#fcb900" fillOpacity="1"></path></svg>;
    const seaWaves = <svg width="100%" height="100%" id="svg" viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg"><path d="M 0,400 C 0,400 0,80 0,80 C 75,90 151,100 241,96 C 330,91 433,71 505,72 C 576,72 617,92 688,92 C 758,91 858,69 944,72 C 1029,74 1098,100 1179,106 C 1259,111 1349,95 1440,80 C 1440,80 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#0693e3" fillOpacity="0.265"></path><path d="M 0,400 C 0,400 0,160 0,160 C 83,161 166,162 243,158 C 319,153 389,143 463,142 C 536,140 612,146 704,153 C 795,159 903,165 983,159 C 1062,152 1115,132 1187,131 C 1258,129 1349,144 1440,160 C 1440,160 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#0693e3" fillOpacity="0.4"></path><path d="M 0,400 C 0,400 0,240 0,240 C 85,247 170,255 246,248 C 321,240 385,219 473,215 C 560,210 669,224 753,240 C 836,255 893,272 961,269 C 1028,265 1106,242 1188,234 C 1269,225 1354,232 1440,240 C 1440,240 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#0693e3" fillOpacity="0.53"></path><path d="M 0,400 C 0,400 0,320 0,320 C 68,318 137,317 209,312 C 280,306 354,295 436,306 C 517,316 606,347 690,345 C 773,342 851,305 948,294 C 1044,282 1158,297 1243,306 C 1327,314 1383,317 1440,320 C 1440,320 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="#0693e3" fillOpacity="1"></path></svg>;
    const lavaSVG = <svg width="100%" height="100%" id="svg" viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gradientLava" x1="56%" y1="0%" x2="44%" y2="100%"><stop offset="5%" stop-color="#eb144c"></stop><stop offset="95%" stop-color="#fcb900"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,80 0,80 C 121,99 243,118 379,109 C 514,99 665,60 778,56 C 890,51 965,80 1070,90 C 1174,99 1307,89 1440,80 C 1440,80 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="url(#gradientLava)" fillOpacity="0.265"></path><defs><linearGradient id="gradientLava" x1="56%" y1="0%" x2="44%" y2="100%"><stop offset="5%" stop-color="#eb144c"></stop><stop offset="95%" stop-color="#fcb900"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,160 0,160 C 155,148 310,136 415,140 C 519,143 574,162 680,168 C 785,173 942,165 1078,162 C 1213,158 1326,159 1440,160 C 1440,160 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="url(#gradientLava)" fillOpacity="0.4"></path><defs><linearGradient id="gradientLava" x1="56%" y1="0%" x2="44%" y2="100%"><stop offset="5%" stop-color="#eb144c"></stop><stop offset="95%" stop-color="#fcb900"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,240 0,240 C 86,245 172,251 315,244 C 457,236 656,216 782,216 C 907,215 959,233 1057,241 C 1154,248 1297,244 1440,240 C 1440,240 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="url(#gradientLava)" fillOpacity="0.53"></path><defs><linearGradient id="gradientLava" x1="56%" y1="0%" x2="44%" y2="100%"><stop offset="5%" stop-color="#eb144c"></stop><stop offset="95%" stop-color="#fcb900"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,320 0,320 C 82,326 164,332 308,338 C 451,343 656,347 775,344 C 893,340 924,330 1021,325 C 1117,319 1278,319 1440,320 C 1440,320 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="url(#gradientLava)" fillOpacity="1"></path></svg>;
    const jungleSVG = <svg width="100%" height="100%" id="svg" viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gradientJungle" x1="4%" y1="30%" x2="96%" y2="70%"><stop offset="5%" stop-color="#7bdcb5"></stop><stop offset="95%" stop-color="#00d084"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,80 0,80 C 29,80 58,80 79,77 C 99,73 111,64 134,64 C 156,63 190,70 217,76 C 243,81 263,86 283,95 C 302,103 322,114 348,106 C 373,97 405,69 436,62 C 466,54 495,67 517,72 C 538,76 551,73 571,76 C 590,78 616,86 645,93 C 673,99 703,104 728,108 C 752,111 770,112 793,108 C 815,103 841,92 867,90 C 892,87 918,93 941,93 C 963,92 984,85 1007,78 C 1029,70 1053,63 1078,63 C 1102,62 1126,70 1150,74 C 1173,77 1195,77 1223,80 C 1250,82 1282,88 1304,88 C 1325,87 1337,79 1358,77 C 1378,74 1409,77 1440,80 C 1440,80 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="url(#gradientJungle)" fillOpacity="0.265"></path><defs><linearGradient id="gradientJungle" x1="4%" y1="30%" x2="96%" y2="70%"><stop offset="5%" stop-color="#7bdcb5"></stop><stop offset="95%" stop-color="#00d084"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,160 0,160 C 29,161 58,162 82,160 C 105,157 122,150 142,155 C 161,159 183,176 208,184 C 232,191 260,191 287,179 C 313,166 338,143 362,136 C 385,128 407,136 433,145 C 458,153 487,162 512,170 C 536,177 557,181 578,177 C 598,172 618,158 640,147 C 661,135 683,127 710,132 C 736,136 768,154 792,156 C 815,157 830,142 852,144 C 873,145 902,161 928,166 C 953,170 975,161 1001,164 C 1026,166 1055,178 1077,174 C 1098,169 1113,147 1139,150 C 1164,152 1201,179 1230,184 C 1258,188 1279,170 1301,168 C 1322,165 1342,177 1366,179 C 1389,180 1414,170 1440,160 C 1440,160 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="url(#gradientJungle)" fillOpacity="0.4"></path><defs><linearGradient id="gradientJungle" x1="4%" y1="30%" x2="96%" y2="70%"><stop offset="5%" stop-color="#7bdcb5"></stop><stop offset="95%" stop-color="#00d084"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,240 0,240 C 29,222 58,205 80,213 C 101,220 114,251 134,255 C 153,258 180,232 207,232 C 233,231 259,256 282,265 C 304,273 324,266 348,257 C 371,247 397,234 426,238 C 454,241 484,260 510,263 C 535,265 555,250 579,248 C 602,245 628,255 654,246 C 679,236 705,206 727,210 C 748,213 767,249 789,254 C 810,258 834,231 861,226 C 887,220 917,234 939,238 C 960,241 975,232 997,228 C 1018,223 1046,222 1076,225 C 1105,227 1136,232 1160,241 C 1183,249 1200,262 1221,261 C 1241,259 1265,244 1291,234 C 1316,223 1342,216 1368,218 C 1393,219 1416,229 1440,240 C 1440,240 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="url(#gradientJungle)" fillOpacity="0.53"></path><defs><linearGradient id="gradientJungle" x1="4%" y1="30%" x2="96%" y2="70%"><stop offset="5%" stop-color="#7bdcb5"></stop><stop offset="95%" stop-color="#00d084"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,320 0,320 C 26,332 53,344 74,339 C 94,333 108,310 133,302 C 157,293 191,298 219,297 C 246,295 266,288 287,300 C 307,311 329,341 352,348 C 374,354 396,337 426,333 C 455,328 492,337 514,338 C 535,338 542,331 568,327 C 593,322 636,319 660,315 C 683,310 686,304 708,303 C 729,301 770,304 798,305 C 825,305 841,302 861,312 C 880,321 905,344 934,339 C 962,333 995,298 1017,291 C 1038,283 1048,303 1074,317 C 1099,330 1139,336 1164,330 C 1188,323 1197,304 1215,304 C 1232,303 1257,320 1285,325 C 1312,329 1342,322 1369,320 C 1395,317 1417,318 1440,320 C 1440,320 1440,400 1440,400 Z" stroke="none" strokeWidth="0" fill="url(#gradientJungle)" fillOpacity="1"></path></svg>;
    const flowersSVG = <svg width="100%" height="100%" id="svg" viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg"><path d="M 0,500 C 0,500 0,100 0,100 C 101,117 203,134 392,125 C 580,115 856,80 1046,72 C 1235,63 1337,81 1440,100 C 1440,100 1440,500 1440,500 Z" stroke="none" strokeWidth="0" fill="#9900ef" fillOpacity="0.265"></path><path d="M 0,500 C 0,500 0,200 0,200 C 212,217 425,235 565,228 C 704,220 771,187 905,179 C 1038,170 1239,185 1440,200 C 1440,200 1440,500 1440,500 Z" stroke="none" strokeWidth="0" fill="#9900ef" fillOpacity="0.4"></path><path d="M 0,500 C 0,500 0,300 0,300 C 202,305 405,310 539,317 C 672,323 737,331 876,329 C 1014,326 1227,313 1440,300 C 1440,300 1440,500 1440,500 Z" stroke="none" strokeWidth="0" fill="#9900ef" fillOpacity="0.53"></path><path d="M 0,500 C 0,500 0,400 0,400 C 118,400 237,401 420,410 C 602,418 847,436 1028,436 C 1208,435 1324,417 1440,400 C 1440,400 1440,500 1440,500 Z" stroke="none" strokeWidth="0" fill="#9900ef" fillOpacity="1"></path></svg>;

    const backgroundSVGLookup: Record<Backing, JSX.Element> = {
        "desert": desertWaves,
        "water": seaWaves,
        "flowers": flowersSVG,
        "jungle": jungleSVG,
        "lava": lavaSVG
    };
    const backgroundSVG = backgroundSVGLookup[card.backing];

    const springs = useSpring({
        transform: `perspective(600px) rotateX(${card.isFaceUp ? 0 : 180}deg)`
    });
    const facingClass = card.isFaceUp ? "faceUp" : "faceDown";
    const highlightClass = isLatestFlip ? "latest" : (isPreviousFlip ? "previous" : "");

    return (
        <animated.div
            style={{ ...springs }}
            className={`card ${card.creature} ${card.backing} ${facingClass} ${highlightClass}`}
            onClick={() => dispatch({ type: "flip", clickedCard: card })}
        >
            {card.isFaceUp ? <div className="backgroundSVG">{backgroundSVG}</div> : ""}
            {card.isFaceUp ? card.creature : ""}
        </animated.div>
    );
}

