export default function asyncLoadJs(url) {
	return new Promise((resolve, reject) => {
		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		document.body.appendChild(script);
		script.onload = () => {
			resolve();
		};
		script.onerror = () => {
			reject();
		};
	});
}
export function loadEpubJs() {
	return new Promise((resolve, reject) => {
		asyncLoadJs('http://futurepress.github.io/epub.js/dist/epub.js')
			.then(() => {
				return asyncLoadJs(
					'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js'
				);
			})
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
}
export function readBook(url) {
	return new Promise((resolve, reject) => {
		const book = new window.ePub(url);
		let archived = false;
		var bookSetTimeout = setTimeout(() => {
			if (!archived) {
				reject();
			}
		}, 5000);
		const bookCoverSetInterval = setInterval(() => {
			if (typeof book.archive !== 'undefined') {
				if (Object.keys(book.archive.urlCache).length !== 0) {
					archived = true;
					clearTimeout(bookSetTimeout);
					clearInterval(bookCoverSetInterval);
					book.loading.metadata.promise.then((res) => {
						res.bookimg = book.archive.urlCache[book.cover];
						resolve(res);
					});
				}
			}
		}, 10);
	});
}
