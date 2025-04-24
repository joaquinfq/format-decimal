/**
 * Verifica si el valor de configuración ha sido especificado y lo devuelve o devuelve el valor por defecto.
 *
 * @param {(number|string)} value    Valor de configuración a verificar.
 * @param {string}          type     Tipo que debe tener el valor.
 * @param {(number|string)} defvalue Valor por defecto a devolver.
 *
 * @returns {(number|string)}
 */
function check(value, type, defvalue)
{
    return typeof value === type ? value : defvalue;
}

/**
 * Devuelve el número especificado formateado con los separadores especificados.
 *
 * @param {number}  value            Valor a formatear.
 * @param {object}  config           Configuración para modificar el resultado.
 * @param {string}  config.decimal   Símbolo a usar para el punto decimal (`,` por defecto).
 * @param {number}  config.precision Número de dígitos decimales a mostrar (`2` por defecto).
 * @param {string}  config.thousands Separador de miles ('.' por defecto).
 *
 * @return {String} Número formateado.
 *
 * @namespace jf
 */
export default function formatDecimal(value, config)
{
    if (!Number.isFinite(value))
    {
        throw new TypeError(`You MUST specify a finite number, not [${ typeof value } = ${ value }]`);
    }
    //------------------------------------------------------------------------------
    // Obtención del resultado.
    //------------------------------------------------------------------------------
    var _parts = value.toFixed(check(config?.precision, 'number', 2)).split('.');

    _parts[0] = _parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, check(config?.thousands, 'string', '.'));

    return _parts.join(check(config?.decimal, 'string', ','));
};
