import {MarkdownBase} from "./base";
import {setIcon} from "obsidian";
import {ParserResult} from "../../parser";
import {FlashcardsManager} from "../../data/flashcardsManager";
import {QuizView, QuizViewSettings} from "../quiz";
import {ResultsController} from "../../data/controllers/resultsController";
import {DataController} from "../../data/controllers/dataController";
import {GroupsController} from "../../data/controllers/groupsController";

export class MarkdownQuizView extends MarkdownBase {
	dataController: DataController;
	resultsController: ResultsController;
	groupsController: GroupsController;

	parserResult: ParserResult;

	quizViewSettings: QuizViewSettings;

	setDataController(dataController: DataController): this {
		this.dataController = dataController;
		return this;
	}

	setResultsController(resultsController: ResultsController): this {
		this.resultsController = resultsController;
		return this;
	}

	setGroupsController(groupsController: GroupsController): this {
		this.groupsController = groupsController;
		return this;
	}

	setParserResult(parserResult: ParserResult): this {
		this.parserResult = parserResult;
		return this;
	}

	setQuizViewSettings(quizViewSettings: QuizViewSettings): this {
		this.quizViewSettings = quizViewSettings;
		return this;
	}

	render() {
		const flashcardsManager = new FlashcardsManager();
		flashcardsManager.setFlashcards(this.parserResult.flashcards);

		const baseContainer = this.getBaseContainer();
		baseContainer.primaryTitle.setText("Quiz");
		setIcon(baseContainer.icon, "play");

		new QuizView(baseContainer.container)
			.setDataController(this.dataController)
			.setResultsController(this.resultsController)
			.setGroupsController(this.groupsController)
			.setFlashcardsManager(flashcardsManager)
			.setQuizViewSettings(this.quizViewSettings)
			.render();
	}
}
