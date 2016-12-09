<github>
	<div id="github-repositories">
		<button id="github-repositories-show-toggle" onclick={ toggleRepos }>Toggle hide/show</button>
		<section class="github-repository" each={ repository, index in displayedRepos }>
			<h2 class="github-repository-name"><a href={ repository.html_url }>{ repository.name }</a></h2>
			<p class="github-repository-description">{ repository.description }</p>
		</section>
		<p id="github-repositories-count" if={ hide }>{ repoCount() } repositories hidden</p>
	</div>
	<script>
		const Github = require('github-api')
		let gh = new Github(),
			me = gh.getUser(opts.username)

		let repos = []

		this.hide = true
		this.displayedRepos = []

		me.listRepos()
			.then((res) => {
				repos = res.data
				this.displayedRepos = repos.slice(0, 5)
				this.update()
			})
			.catch((error) => console.log(`Error! ${error}`))

		toggleRepos() {
			if(this.hide)
				this.displayedRepos = repos
			else
				this.displayedRepos = repos.slice(0, 5)

			this.hide = !this.hide
		}

		repoCount() {
			return `${repos.length - this.displayedRepos.length}`
		}
	</script>
</github>
