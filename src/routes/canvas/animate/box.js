/**
 * Created by Administrator on 2/18.
 */
import fours from './things/fourS'
import _ from 'lodash'
import config from '../config'

// 生成阻挡物
const _getWall0 = config => {
    const {width, height, l} = config
    const arr = []
    const res = {}
    const __ = width => arr => width == 0 ? [0].concat(arr) : __(width - l)([width].concat(arr))
    const arrWidth = __(width)([]);
    const arrHeight = __(height)([]);
    res[-l] = {},
    _.map(arrWidth, e => {
        res[e] = {}
        res[e][height] = 1
    });
    _.map(arrHeight, e => ( res[-l][e] = 1));
    _.map(arrHeight, e => res[width][e] = 1);
    return res

}
const _getWall = res => things => {
    const _res = _.cloneDeep(res)
    _.map(things, e => _res[e.x][e.y] = 1)
    return _res
}

export default class box {

    _init() {
        this.things.push(new fours({type: _.random(1,7)}));
    }

    _initStop() {
        const self = this
        const {things} = self
        const num = config.width / config.l
        self.things = _.last(things).fourArr.concat(_.dropRight(things))
        const _cleanRow = num => things => {
            const _just = _.reduce(things, (res, e, i) => {
                const _obj = res[e.y] || []
                _obj.push(i)
                res[e.y] = _obj
                _obj.length >= num ?
                    (res.xx = res.xx.concat(_obj), res.miny.push(e.y))
                    : 0
                return res
            }, {xx: [], miny: []})
            return _.map(_.filter(things, (e, i) => !_.includes(_just.xx, i)), e => {
                _.map(_just.miny, miny => {
                    e.y < miny ? e.run() : 0
                })
                return e
            })
        }
        self.things = _cleanRow(num)(self.things)
        self._init()
    }

    _initHigh() {
        const __ = width => arr => width == 0 ? [0].concat(arr) : __(width - config.l)([width].concat(arr))
        const arr = __(config.width - config.l)([]);
        var high = {}
        _.map(arr, e => {
            high[e] = config.height - config.l
        })
        return high
    }

    constructor(option) {
        const self = this;
        self.things = [];
        self._init();
        self.high = self._initHigh()
        self.stop = false
        self.walls = _getWall0(config)
        function keyUp(e) {
            var currKey = 0, e = e || event;
            currKey = e.keyCode || e.which || e.charCode;
            self.move(currKey);
        }
        document.onkeyup = keyUp;
    }

    run() {
        const self = this;
        const things = self.things;
        let thing = things[things.length - 1];
        const walls = _getWall(self.walls)(_.dropRight(things));
        const res = thing.justify(walls);
        res.flag ? res.stop ? self.stop = true : (self._initStop(), self.high = res.high) : thing.run();
        return self;
    }

    draw(context) {
        const self = this;
        context.clearRect(0, 0, config.width, config.height)
        _.map(self.things, e => e.draw(context));
        return this;
    }

    move(type) {
        if (type == 40) {
            this.run();
            return
        }
        const walls = _getWall(this.walls)(_.dropRight(this.things));
        _.last(this.things).move(type, walls)
    }

}
