import React, { useContext, useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Grid, Image, Card, Button, Icon, Label, Form } from 'semantic-ui-react';
import moment from 'moment';

import { FETCH_POST_QUERY, CREATE_COMMENT_MUTATION } from '../util/graphql';
import { LikeButton, DeleteButton } from '../components/';
import { AuthContext } from '../context/auth';

const SinglePostPage = (props) => {
	const postId = props.match.params.postId;
	const { user } = useContext(AuthContext);
	const commentInputRef = useRef(null);
	const [comment, setComment] = useState('');

	const { data } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId,
		},
	});

	const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
		update() {
			setComment('');
			commentInputRef.current.blur();
		},
		variables: {
			postId,
			body: comment,
		},
	});

	const deletePostCallback = () => {
		props.history.push('/');
	};

	let postMarkup;

	if (!data) {
		postMarkup = <p>Loading...</p>;
	} else {
		const { id, body, createdAt, username, comments, likes, likeCount, commentCount } =
			data.getPost;

		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							size='small'
							float='right'
							src='https://react.semantic-ui.com/images/avatar/large/molly.png'
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
								<Card.Description>{body}</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<LikeButton user={user} post={{ id, likeCount, likes }} />
								<Button
									as='div'
									labelPosition='right'
									onClick={() => console.log('Comment on post')}>
									<Button basic color='blue'>
										<Icon name='comments' />
									</Button>
									<Label basic color='blue' pointing='left'>
										{commentCount}
									</Label>
								</Button>
								{user && user.username === username && (
									<DeleteButton postId={id} callback={deletePostCallback} />
								)}
							</Card.Content>
						</Card>
						{user && (
							<Card fluid>
								<Card.Content>
									<p>Post a comment</p>
									<Form>
										<div className='ui action input fluid'>
											<input
												type='text'
												placeholder='Comment...'
												name='comment'
												value={comment}
												ref={commentInputRef}
												onChange={(e) => setComment(e.target.value)}
											/>
											<button
												className='ui button teal'
												type='submit'
												disabled={comment.trim() === ''}
												onClick={createComment}>
												Submit
											</button>
										</div>
									</Form>
								</Card.Content>
							</Card>
						)}
						{comments.map((comment) => (
							<Card fluid key={comment.id}>
								<Card.Content>
									{user && user.username === comment.username && (
										<DeleteButton postId={id} commentId={comment.id} />
									)}
									<Card.Header>{comment.username}</Card.Header>
									<Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
									<Card.Description>{comment.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
	return <div>{postMarkup}</div>;
};

export default SinglePostPage;
