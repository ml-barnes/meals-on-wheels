import React from 'react'


class PhoneNumberTypeList extends React.Component {
    constructor() {
        super()
    }

    render() {
        return(
            <div>
                {props.type}
            </div>
        )
    }
}

export default PhoneNumberTypeList