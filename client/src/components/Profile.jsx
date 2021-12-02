import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import Page from '../Container/Page'
import ProfilePosts from './ProfilePosts'

import { useStateContext } from '../context/store'
import { fetchProfileData } from '../api'

const Profile = () => {

	const { user: { token } } = useStateContext()
	const { username } = useParams()

	const [profileData, setProfiledata] = useState({
			profileUsername: '',
			profileAvatar: 'https://gravatar.com/avatar/placeholder?s=128',
			isFollowing: false,
			counts: {
				postCount: '',
				followerCount: '',
				followingCount: ''
			}
		})

	const { isLoading, error } = useQuery(['profileData', { token, username }], fetchProfileData, {
		onSuccess: data => setProfiledata(data)
	})
	
	if (error) return 'An error occured fetching the profile data.' + error.message

	return (
		<Page title={profileData.profileUsername || isLoading && '...'}>
			<h2>
				<img className="avatar-small" src={profileData.profileAvatar} /> {profileData.profileUsername}
			</h2>

			<div className="profile-nav nav nav-tabs pt-2 mb-4">
				<a href="#" className="active nav-item nav-link">
					Posts: {profileData.counts.postCount}
				</a>
				<a href="#" className="nav-item nav-link">
					Followers: {profileData.counts.followerCount}
				</a>
				<a href="#" className="nav-item nav-link">
					Following: {profileData.counts.followingCount}
				</a>
			</div>
			<ProfilePosts />
	  	</Page>
	)
}

export default Profile