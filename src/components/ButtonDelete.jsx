import React, { useState } from 'react';
import { Button, Icon, Confirm, Popup } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY, DELETE_COMMENT_MUTATION } from '../util/graphql';

const DeleteButton = ({ postId, commentId, callback }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

	const [deletePostOrComment] = useMutation(mutation, {
		update(proxy) {
			setConfirmOpen(false);

			if (!commentId) {
				const data = proxy.readQuery({
					query: FETCH_POSTS_QUERY,
				});
				let newData = [...data.getPosts];
				newData.getPosts = [...data.getPosts].filter((p) => p.id !== postId);
				proxy.writeQuery({
					query: FETCH_POSTS_QUERY,
					data: newData,
				});
			}

			if (callback) callback();
		},
		variables: {
			postId,
			commentId,
		},
	});

	return (
		<>
			<Popup
				content={`Delete ${commentId ? 'comment' : 'post'}`}
				inverted
				trigger={
					<Button
						floated='right'
						as='div'
						color='red'
						onClick={() => setConfirmOpen(true)}>
						<Icon name='trash' style={{ margin: 0 }} />
					</Button>
				}
			/>

			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={() => deletePostOrComment()}
			/>
		</>
	);
};

export default DeleteButton;
