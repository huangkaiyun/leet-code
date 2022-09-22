import { CodeLanguage } from '@core/types/problem';
import { ProblemsService } from '@core/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Problem } from '@core/types';
import { editor } from 'monaco-editor';

declare const monaco: any;

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.less'],
})
export class ProblemComponent implements OnInit {
  problem?: Problem;
  type?: { label: string; icon: string };

  languages: CodeLanguage[] = [];
  selected: CodeLanguage = 'typescript';
  editor?: editor.ICodeEditor | editor.IEditor;
  inputValue: string = '';
  example?: { input: any; output: any };

  constructor(
    private route: ActivatedRoute,
    private problemsService: ProblemsService
  ) {}

  get editorOption() {
    return {
      theme: 'vs-dark',
      language: this.selected,
    };
  }

  onLangChang(lang: CodeLanguage) {
    if (this.editor && this.problem)
      this.editor.setModel(
        monaco.editor.createModel(this.problem.solutions[lang] || '', lang)
      );
  }

  onEditorInit(e: any) {
    this.editor = e;
    this.onLangChang(this.selected);
  }

  onExampleChange(example: { input: any; output: any }) {
    this.example = example;
    if (Array.isArray(example.input))
      this.inputValue = example.input.join('\r\n');
    else this.inputValue = example.input;
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      const problemId = id;
      this.problem = this.problemsService.getById(Number(problemId));
      if (this.problem) {
        this.type = this.problemsService.types.find(
          ({ label }) => label == this.problem?.type
        );
        this.languages = Object.keys(this.problem.solutions) as CodeLanguage[];
        this.onExampleChange(this.problem.examples[0]);
        this.onLangChang(this.selected);
      }
    });
  }
}