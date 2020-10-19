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
                imageAddress: ""
            };
        }

        handleChange = (event) => {
            const target = event.target;
            const name = target.name;
            const type = target.type;
            const value = type === 'checkbox' ? target.checked : (target.value.length !== 0 ? target.value : undefined);
            this.setState({ [name]: value })
        }

        handleFile = (event) => {
            if (event.target.files && event.target.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.setState({ imageAddress: e.target.result });
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        }

        handleSubmit = (event) => {

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