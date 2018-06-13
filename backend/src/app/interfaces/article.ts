export interface Article {
	_id: string,
	author: string,
	creation_date: number,
	edit_date: number,
	status: boolean,
	content: Content,
	category: string,
	tags: Array<string>
}

export interface Content {
	header: string,
	title: string,
	content_markdown: string,
	content_html: string,
}