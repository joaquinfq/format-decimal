import assert        from 'node:assert';
import formatDecimal from './index.js';

const items = [
    //@formatter:off
    [ 1.234567e-20, "{s}0{d}000"                                       ],
    [ 1.234567e-19, "{s}0{d}000"                                       ],
    [ 1.234567e-18, "{s}0{d}000"                                       ],
    [ 1.234567e-17, "{s}0{d}000"                                       ],
    [ 1.234567e-16, "{s}0{d}000"                                       ],
    [ 1.234567e-15, "{s}0{d}000"                                       ],
    [ 1.234567e-14, "{s}0{d}000"                                       ],
    [ 1.234567e-13, "{s}0{d}000"                                       ],
    [ 1.234567e-12, "{s}0{d}000"                                       ],
    [ 1.234567e-11, "{s}0{d}000"                                       ],
    [ 1.234567e-10, "{s}0{d}000"                                       ],
    [ 1.234567e-9,  "{s}0{d}000"                                       ],
    [ 1.234567e-8,  "{s}0{d}000"                                       ],
    [ 1.234567e-7,  "{s}0{d}000"                                       ],
    [ 1.234567e-6,  "{s}0{d}000"                                       ],
    [ 1.234567e-5,  "{s}0{d}000"                                       ],
    [ 1.234567e-4,  "{s}0{d}000"                                       ],
    [ 1.234567e-3,  "{s}0{d}001"                                       ],
    [ 1.234567e-2,  "{s}0{d}012"                                       ],
    [ 1.234567e-1,  "{s}0{d}123"                                       ],
    [ 1.234567e-0,  "{s}1{d}235"                                       ],
    [ 1.234567e1,   "{s}12{d}346"                                      ],
    [ 1.234567e2,   "{s}123{d}457"                                     ],
    [ 1.234567e3,   "{s}1{t}234{d}567"                                 ],
    [ 1.234567e4,   "{s}12{t}345{d}670"                                ],
    [ 1.234567e5,   "{s}123{t}456{d}700"                               ],
    [ 1.234567e6,   "{s}1{t}234{t}567{d}000"                           ],
    [ 1.234567e7,   "{s}12{t}345{t}670{d}000"                          ],
    [ 1.234567e8,   "{s}123{t}456{t}700{d}000"                         ],
    [ 1.234567e9,   "{s}1{t}234{t}567{t}000{d}000"                     ],
    [ 1.234567e10,  "{s}12{t}345{t}670{t}000{d}000"                    ],
    [ 1.234567e11,  "{s}123{t}456{t}700{t}000{d}000"                   ],
    [ 1.234567e12,  "{s}1{t}234{t}567{t}000{t}000{d}000"               ],
    [ 1.234567e13,  "{s}12{t}345{t}670{t}000{t}000{d}000"              ],
    [ 1.234567e14,  "{s}123{t}456{t}700{t}000{t}000{d}000"             ],
    [ 1.234567e15,  "{s}1{t}234{t}567{t}000{t}000{t}000{d}000"         ],
    [ 1.234567e16,  "{s}12{t}345{t}670{t}000{t}000{t}000{d}000"        ],
    [ 1.234567e17,  "{s}123{t}456{t}700{t}000{t}000{t}000{d}000"       ],
    [ 1.234567e18,  "{s}1{t}234{t}567{t}000{t}000{t}000{t}000{d}000"   ],
    [ 1.234567e19,  "{s}12{t}345{t}670{t}000{t}000{t}000{t}000{d}000"  ],
    [ 1.234567e20,  "{s}123{t}456{t}700{t}000{t}000{t}000{t}000{d}000" ]
    //@formatter:on
];

/**
 * Verificación de las opciones de configuración.
 *
 * @param {Array[]} items Listado de elementos con las validaciones y datos de la prueba.
 */
function testConfig(items)
{
    for (let _sign of [ -1, 1 ])
    {
        for (let _decimal of [ '.', ',' ])
        {
            const _thousands = _decimal === '.' ? ',' : '.';
            for (let _item of items)
            {
                ++assertions;
                const _actual = formatDecimal(
                    _sign * _item[0],
                    {
                        decimal   : _decimal,
                        precision : 3,
                        thousands : _thousands
                    }
                );
                const _expected = _item[1]
                    .replace('{s}', _sign > 0 ? '' : '-')
                    .replace(/\{d\}/g, _decimal)
                    .replace(/\{t\}/g, _thousands);
                assert.equal(
                    _expected,
                    _actual,
                    `Decimal: [${ _decimal }] -- Thousands: [${ _thousands }] :: ${ _expected } !== ${ _actual }`);
            }
        }
    }
}

/**
 * Verifica que se lancen las excepciones si se usan valores no numéricos.
 */
function testTypeError()
{
    [ true, 'test', [ 1, 2 ], null, {}, undefined ].forEach(
        value => assert.throws(
            () =>
            {
                ++assertions;
                formatDecimal(value);
            },
            err => err instanceof TypeError &&
                   err.message === `You MUST specify a finite number, not [${ typeof value } = ${ value }]`
        )
    );
}

//------------------------------------------------------------------------------
// Inicio de las pruebas
//------------------------------------------------------------------------------
let assertions = 0;
const startTime = new Date().getTime();
testConfig(items);
testTypeError();
//
console.log('Total assertions : %d', assertions);
console.log('Time elapsed     : %sms', formatDecimal(new Date().getTime() - startTime));
