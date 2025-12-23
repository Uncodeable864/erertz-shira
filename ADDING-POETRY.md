# Adding Poetry

Thanking for wanting to contribute to Eretz Shira! We hope that you can expand our library for all to enjoy.

## Selection

Poetry should:

- Relate to Zionism, Israel, or Judiasm.
- Have a translation. This *can* be your original work. Multiple translations may be added.
- Be a Jewish language (e.g., Hebrew, Aramaic, Yiddish, Ladino, Judeo-Arabic, etc.). The poem should be written in Hebrew script.

Poetry usually shouldn't:
- Be your original work.

## Creating the JSON file
### Poem
> While we prefer to use Git, we understand that this may not be possible for everyone. If you don't have Git, please use GitHub's interface to create a issue and we'll help you add the poem.

In the `src/lib/poems` directory, create a new JSON file for your poem. The filename should be the poem's transliterated title (e.g., `ha-shir-layla.json`). Do not use special characters or spaces, and ensure the filename is lowercase.

The JSON file should have the following structure:

```json
{
	"metadata": {
		"title": "Title goes here",
		"hebrewTitle": "Title, in Hebrew without nikkud, goes here",
        "description": "A description of the poem goes here.",
		"author": {
			"id": "The ID of the author. Check to see if the author already exists in src/lib/authors.",
			"en": "English name goes here",
			"he": "Hebrew name goes here",
			"description": "A description of the author goes here.",
			"infoUrl": "A URL to the author's Wikipedia page goes here."
		}
	},
	"translations": [
		{
			"id": "An ID for the translation, similar to the filename for the poem. For the default translation, use `default`. This should be unique.",
			"name": "The name of the translation goes here.",
			"author": "The author of the translation goes here. If it is a translation by the author, use the author's name.",
			"copyright": "The copyright of the translation goes here.",
			"infoUrl": "Add a link to the source of the translation, if applicable."
		}
	],
    "content": [
        "see below"
    ]
}
```

The `content` field is an array of arrays of stanzas, with an array of lines for each stanza. Each line is an object with the following structure:

```json
{
    "id": "An ID for the line. This should be unique.",
    "hebrew": "The Hebrew text of the line, with nikkud, goes here.",
    "trans": {
        "default": "The default translation of the line goes here. All other translations should be added in seperate fields, corresponding to the ID of the translation."
    }
}
```

For example, one stanza of Tzion Halo Tishali might look like this:

```json
[
    {
        "id": "line1",
        "hebrew": "צִיּוֹן, הֲלֹא תִשְׁאֲלִי לִשְׁלוֹם אֲסִירַיִךְ,",
        "trans": {
            "default": "Zion! wilt thou not ask if peace be with thy captives"
            }
        },
        {
            "id": "line2",
            "hebrew": "דּוֹרְשֵׁי שְׁלוֹמֵךְ וְהֵם יֶתֶר עֲדָרָיִךְ?",
            "trans": {
                "default": "That seek thy peace—that are the remnant of thy flock?"
            }
    }
]

```

### Author

If the author of the poem is not already in the `src/lib/authors` directory, create a new JSON file for the author. The filename should be the author's transliterated name (e.g., `yehuda-halevi.json`). Do not use special characters or spaces, and ensure the filename is lowercase.

The JSON file should have the following structure:

```json
{
    "id": "The ID of the author. This should be unique.",
    "name": {
        "en": "English name goes here",
        "he": "Hebrew name goes here"
    },
    "description": "A description of the author goes here.",
    "infoUrl": "A URL to the author's Wikipedia page goes here.",
    "poems": [
        {
            "id": "The ID of the poem goes here.",
            "en": "English name goes here",
            "he": "Hebrew name goes here"
        }
    ]
}
```

## Submitting the Pull Request

Once you have created the JSON files, please submit a pull request to the repository. We will review your pull request and merge it into the main branch.

*By submitting a pull request, you agree to license your work under the AGPLv3 license.*

Thank you for your contribution!