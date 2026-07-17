class EmailUtil {

    validar(email) {

        email = email.trim().toLowerCase();

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);
    }

}

export default new EmailUtil();