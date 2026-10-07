import { useState } from "react";

export const useForm = (valoresIniciales = {}) => {
    const [formulario, setFormulario] = useState(valoresIniciales);


    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setFormulario((formularioPrevio)=> ({
            ...formularioPrevio,
            [name]: value,
        }));
    };


    const reiniciarFormulario = () => {
        setFormulario(valoresIniciales);
    };


    
    return {
        formulario,
        manejarCambio,
        reiniciarFormulario,
    };
/**:C */
};