import React from "react";
import { toaster } from "evergreen-ui";
import { Redirect } from "react-router-dom";
import { doGetJobDetail } from "../../data/api";

class JobDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobDetail: null,
            loading: false,
            hasError: false
        };
    }

    componentDidMount() {
        const { params: { id } } = this.props.computedMatch;
        doGetJobDetail(id).then(body => {
            this.setState({
                jobDetail: body.job
            });
        }).catch(err => {
            this.setState({
                hasError: true
            });

            toaster.danger(err.message);
        });
    }

    render() {
        if (this.state.hasError) {
            return <Redirect to="/"/>;
        }

        return (
            <div>asdf</div>
        );
    }
}

export default JobDetail;