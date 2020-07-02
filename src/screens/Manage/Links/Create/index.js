import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../../Layouts/Manage/index';
import { getFormData } from '../../../../helpers/form';
import { linkCreate } from '../../../../actions/LinkActions';

const Create = ({linkCreate, link}) => {
    
    if(link) return <Redirect to="/manage/links"/>;
    
    const submitHandler = (e) => {
        e.preventDefault();//para o formulário não ser submetido pelo browser e sim por essa function
        const data = getFormData(e);

        linkCreate(data);
    };

    
    console.log('###Create.link', link);

    return (
        <Layout>
            <h1>Create Link</h1>
            <div>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Label:</label>
                        <input type="text" className="form-control" name="label"/>
                    </div>
                    <div className="form-group">
                        <label>Url:</label>
                        <input type="text" className="form-control" name="url"/>
                    </div>
                    <div>
                        <div className="form-group form-check">
                            <label className="form-check-label">
                                <input type="checkbox" name="isSocial"/>
                                <span className="form-check-sign"></span>
                                Is Social
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-round">Submit</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {link: state.link.link}; //esse return é com base no store.js
};

export default connect(mapStateToProps, {linkCreate})(Create);