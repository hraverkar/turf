const Benchmark = require('benchmark');
const {point, lineString, polygon} = require('@turf/helpers');
const equal = require('./');

// Fixtures
const pt = point([1, 1]);
const line = lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);
const poly = polygon([[[1, 1], [1, 10], [10, 10], [10, 1], [1, 1]]]);

/**
 * Benchmark Results
 *
 * point - line x 49,662,649 ops/sec ±1.19% (87 runs sampled)
 * point - polygon x 42,164,979 ops/sec ±0.84% (90 runs sampled)
 * point - point x 19,729,671 ops/sec ±0.91% (93 runs sampled)
 * polygon - polygon x 9,670,025 ops/sec ±1.10% (87 runs sampled)
 * line - line x 12,731,539 ops/sec ±1.12% (85 runs sampled)
 */
const suite = new Benchmark.Suite('turf-boolean-equal');
suite
    .add('precision', () => equal(line, line, false, 6))
    .add('direction', () => equal(line, line, true))
    .add('point - line', () => equal(pt, line))
    .add('point - polygon', () => equal(pt, polygon))
    .add('point - point', () => equal(pt, pt))
    .add('polygon - polygon', () => equal(poly, poly))
    .add('line - line', () => equal(line, line))
    .on('cycle', e => console.log(String(e.target)))
    .on('complete', () => {})
    .run();