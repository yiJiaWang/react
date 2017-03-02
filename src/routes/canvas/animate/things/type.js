/**
 * Created by Administrator on 2/18.
 */

/**
 * 方块组合的参数 旋转方式
 */
export const types = {
    1: {
        0: [[0, 0], [-1, 0], [0, -1], [-1, -1]],
        1: [[0, 0], [-1, 0], [0, -1], [-1, -1]],
        2: [[0, 0], [-1, 0], [0, -1], [-1, -1]],
        3: [[0, 0], [-1, 0], [0, -1], [-1, -1]]
    },
    2: {
        0: [[0, 0], [1, 0], [0, -1], [-1, -1]],
        1: [[0, 0], [0, -1], [-1, 0], [-1, 1]],
        2: [[0, 0], [1, 0], [0, -1], [-1, -1]],
        3: [[0, 0], [0, -1], [-1, 0], [-1, 1]]
    },
    3: {
        0: [[0, -1], [-1, -1], [-1, 0], [-2, 0]],
        1: [[0, 0], [0, 1], [-1, 0], [-1, -1]],
        2: [[0, -1], [-1, -1], [-1, 0], [-2, 0]],
        3: [[0, 0], [0, 1], [-1, 0], [-1, -1]]
    },
    4: {
        0: [[0, 0], [-1, 0], [1, 0], [0, -1]],
        1: [[0, 0], [0, 1], [0, -1], [-1, 0]],
        2: [[0, 0], [-1, 0], [1, 0], [0, 1]],
        3: [[0, 0], [0, 1], [1, 0], [0, -1]]
    },
    5: {
        0: [[0, 0], [-1, 0], [-1, -1], [1, 0]],
        1: [[0, 0], [-1, 0], [0, -1], [0, -2]],
        2: [[0, 0], [0, -1], [-1, -1], [-2, -1]],
        3: [[0, -1], [-1, -1], [-1, 0], [-1, 1]]
    },
    6: {
        0: [[0, 0], [0, -1], [-1, 0], [-2, 0]],
        1: [[0, 0], [0, -1], [-1, -1], [0, 1]],
        2: [[-1, 0], [-1, -1], [0, -1], [1, -1]],
        3: [[0, 0], [-1, 0], [-1, -1], [-1, -2]]
    },
    7: {
        0: [[0, 0], [1, 0], [-1, 0], [-2, 0]],
        1: [[0, 0], [0, -1], [0, -2], [0, 1]],
        2: [[0, 0], [1, 0], [-1, 0], [-2, 0]],
        3: [[0, 0], [0, -1], [0, -2], [0, 1]]
    },
}
export default types
