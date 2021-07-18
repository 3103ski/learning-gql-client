import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm } from '../util/hooks';
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../util/graphql';

const PostForm = (props) => {
	const [errorMsg, setErrorMsg] = useState(null);
	const { values, onChange, onSubmit } = useForm(createPostCallback, {
		body: '',
	});
	const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY,
			});
			let newData = [...data.getPosts];
			newData.getPosts = [result.data.createPost, ...newData];
			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: newData,
			});
			values.body = '';
			setErrorMsg(null);
		},
		onError(err) {
			setErrorMsg(err.graphQLErrors[0].message);
		},
	});

	function createPostCallback() {
		createPost();
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				<h2>Create Post: </h2>
				<Form.Field>
					<Form.Input
						placeholder='Hellooo'
						name='body'
						onChange={onChange}
						value={values.body}
						error={error ? true : false}
					/>
				</Form.Field>
				<Button type='submit' color='teal'>
					Submit
				</Button>
			</Form>
			{errorMsg && (
				<div className='ui error message' style={{ marginBottom: 20 }}>
					<ul className='list'>
						<li>{errorMsg}</li>
					</ul>
				</div>
			)}
		</>
	);
};

export default PostForm;
