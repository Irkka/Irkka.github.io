<github>
	<section class="github-repository" each={repository, index in repos}>{ repository.name }</section>

	<script>
		const Github = require('github-api')
		this.repos = []

		let gh = new Github(),
			me = gh.getUser(opts.githubUsername)

		me.listRepos()
			.then((res) => {
				this.repos = res.data
				this.update()
			})
			.catch((error) => console.log(`Error! ${error}`))
	</script>
</github>
