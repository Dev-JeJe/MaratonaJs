import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import Layout from '../../../Layouts/Manage/index';
import {linkGet} from '../../../../actions/LinkActions';

import FormGroup from '../../../../components/FormGroup';
import FormCheck from '../../../../components/FromCheck';

const Edit = ({link, linkGet}) => {
    const {id} = useParams();

    useEffect(() => {
        linkGet(id);
    }, [id, linkGet]);

    return (
        <Layout>
            <h1>Edit Link</h1>
            <div>
                <form>
                    <FormGroup label="Label" name="label" data={link} type="text" />
                    <FormGroup label="Url" name="url" data={link} type="text" />
                    <FormCheck label="is Social" name="isSocial" data={link} />
                    <div className="form-group">
                        <button className="btn btn-primary btn-round">Submit</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
const mapStateToProps = (state) =>{
    return {
        link: state.link.link,
    };
};

export default connect(mapStateToProps, {linkGet})(Edit);