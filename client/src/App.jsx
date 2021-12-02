import React, { useRef } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Header, Home, Footer, About, Terms, CreatePost, Post, EditPost, Profile, NotFound } from './components'
import { ContextProvider } from './context/store'

const queryClient = new QueryClient()

const App = () => {

	return (
		<QueryClientProvider client={queryClient}>
			<ContextProvider>
				<Router>
					<Header />
					<Switch>
						<Route path='/' exact component={Home} />
						<Route path='/about-us' component={About} />
						<Route path='/terms' component={Terms} />
						<Route path='/create-post'>
							<CreatePost />
						</Route>
						<Route path='/post/:id' exact component={Post} />
						<Route path='/post/:id/edit' component={EditPost} />
						<Route path='/profile/:username' component={Profile} />
						<Route component={NotFound} />
					</Switch>
					<Footer />
				</Router>
			</ContextProvider>
		</QueryClientProvider>
	)
}

export default App