import React from 'react'

const withForm = WrappedComponent => {
    class WithForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                avatar: undefined,
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                birthDate: "",
                title: "",
                isEmailVisible: true,
                gender: "",
                address: "",
                submitActivation: false,
                errors: {
                    email: false,
                    phone: false,
                    birthDate: false,
                    firstName: false,
                    lastName: false
                }
            };
        }

        handleValidation = (name, value) => {
            const { errors, firstName, lastName, phone, email, birthDate } = this.state;

            if (name === 'firstName') {
                value === "" ? errors["firstName"] = true : errors["firstName"] = false;
            }

            if (name === 'lastName') {
                value === "" ? errors["lastName"] = true : errors["lastName"] = false;
            }

            if (name === 'email') {
                const emailValidation = new RegExp('[^@]+@[^.]+..+');
                !emailValidation.test(value) ? errors["email"] = true : errors["email"] = false;
            }

            if (name === 'phone') {
                const phoneValidation = new RegExp('09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}');
                !phoneValidation.test(value) ? errors["phone"] = true : errors["phone"] = false;
            }

            if (name === 'birthDate') {
                const birthDateValidation = new RegExp('^[0-9]{4}([- /.])(((0[13578]|(10|12))\\1(0[1-9]|[1-2][0-9]|3[0-1]))|(02\\1(0[1-9]|[1-2][0-9]))|((0[469]|11)\\1(0[1-9]|[1-2][0-9]|30)))$');
                !birthDateValidation.test(value) ? errors["birthDate"] = true : errors["birthDate"] = false;
            }

            this.setState({
                errors: errors,
                submitActivation: errors["email"] === false && errors["phone"] === false
                    && errors["birthDate"] === false && errors["firstName"] === false
                    && errors["lastName"] === false && firstName !== "" && lastName !== ""
                    && phone !== "" && email !== "" && birthDate !== "" ? true : false
            });
        }

        handleChange = (event) => {
            const target = event.target;
            const name = target.name;
            const type = target.type;
            const value = type === 'checkbox' ? target.checked : target.value;
            this.handleValidation(name, value);
            this.setState({ [name]: value })
        }

        handleFile = (event) => {
            if (event.target.files && event.target.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.setState({ avatar: e.target.result });
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        }

        handleSubmit = (event) => {
            event.preventDefault();
            const { updateAppState } = this.props;
            updateAppState(this.state);
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    data={this.state}
                    handleFile={this.handleFile}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                />
            )
        }
    }
    return WithForm
}

export default withForm