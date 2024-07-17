import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ResetPassword() {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("Las contraseñas no coinciden");
            return;
        }

        if (newPassword === '' || confirmPassword === '') {
            setMessage("Por favor, rellena todos los campos");
            return;
        }

        if (newPassword.length < 8 || confirmPassword.length < 8) {
            setMessage("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        const response = await fetch('http://192.168.1.182:8080/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, newPassword }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage(data.message);
        } else {
            setMessage(data.message);
        }

    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Restablecer Contraseña</h1>
            <input
                type="password"
                placeholder="Nueva Contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleResetPassword} style={styles.button}>Restablecer</button>
            {message && <p style={message.includes('correctamente') ? styles.successMessage : styles.errorMessage}>{message}</p>}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff', // Azul claro
        padding: '0 20px', // Añadido padding horizontal para más espacio en los bordes
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4169e1', // Azul más oscuro
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#4169e1', // Azul más oscuro
        borderRadius: 5,
        boxSizing: 'border-box', // Para incluir el padding en el tamaño total
    },
    button: {
        backgroundColor: '#4169e1', // Azul más oscuro
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        fontSize: 16,
        marginTop: 15, // Añadido margen superior para separar del último input
    },
    successMessage: {
        marginTop: 10,
        color: 'green',
    },
    errorMessage: {
        marginTop: 10,
        color: 'red',
    },
};

export default ResetPassword;
