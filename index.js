/**
 * Devuelve el número especificado formateado con los separadores especificados.
 *
 * @param {Number}  value            Valor a formatear.
 * @param {Object}  config           Configuración para modificar el resultado.
 * @param {String}  config.decimal   Símbolo a usar para el punto decimal (`,` por defecto).
 * @param {Number}  config.precision Número de dígitos decimales a mostrar (`2` por defecto).
 * @param {String}  config.thousands Separador de miles ('.' por defecto).
 *
 * @return {String} Número formateado.
 */
module.exports = function FormatDecimal(value, config)
{
    if (!Number.isFinite(value))
    {
        throw new TypeError(`You MUST specify a finite number, not [${typeof value} = ${value}]`);
    }
    if (!config)
    {
        config = {};
    }
    //------------------------------------------------------------------------------
    // Configuración del resultado.
    //------------------------------------------------------------------------------
    var _decimal   = typeof config.decimal === 'string'
        ? config.decimal
        : ',';
    var _precision = typeof config.precision === 'number'
        ? config.precision
        : 2;
    var _thousands = typeof config.thousands === 'string'
        ? config.thousands
        : '.';
    //------------------------------------------------------------------------------
    // Obtención del resultado.
    //------------------------------------------------------------------------------
    var _parts = value.toFixed(_precision).split('.');
    _parts[0]  = _parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, _thousands);
    //
    return _parts.join(_decimal);
};
