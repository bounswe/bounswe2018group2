import React from "react";

const linkRegex = /!?\[(.+?)]\((.+?)\)/g;
class RichTextFragment extends React.Component {
    render() {
        let { children: text, basic } = this.props;
        const matches = text.match(linkRegex) || [];
        matches.forEach(matchText => {
            const hasMedia = matchText[0] === "!";
            const insideText = matchText.split("[")[1].split("]")[0];
            const link = matchText.split("(")[1].split(")")[0];

            if (hasMedia) {
                const imgText = basic
                    ? insideText
                    : `<img src="${link}" alt="${insideText}"/>`;
                text = text.replace(matchText, imgText);
                return;
            }

            text = text.replace(
                matchText,
                `<a href="${link}">${insideText}</a>`
            );
        });
        return (
            <span
                ref={this.props.baseRef}
                dangerouslySetInnerHTML={{ __html: text }}
                className={this.props.className}
            />
        );
    }
}

export default RichTextFragment;
