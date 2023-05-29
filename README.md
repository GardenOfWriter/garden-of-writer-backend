# **Garden Of writer Server**

## **Branch Strategy**
|branch|description|
|------|---|
|main|메인 저장소|
|release|상용 환경에 배포 될 브랜치|
|dev|개발 환경에 배포 될 브랜치|
|feat/{feature-name}|기능 브랜치|

<br>
## **Branch Naming Convention**

**이슈 생성 시 자동으로 브랜치가 생성됩니다.**
**이슈 생성 시 Assignees, Labels, Project 꼭 설정해주세요**
<img width="908" alt="image" src="https://github.com/rrgks6221/template-test/assets/46591459/3271b87e-237f-4612-9198-e5315bc007d1">

- #{label}/issue-{issueNumber}/{issueTitle}
  - Branch 명으로 적절하지 않은 문자(공백)는 ```_```로 처리됩니다.
  - ex ```doc/issue-1/github_template```

### label
|label|description|
|------|---|
|feat|새로운 기능 추가|
|modify|코드 수정 ⇒ 기능상에 수정이 있는 경우|
|refactor|기능상의 수정이 없이 코드 품질만 올렸을 경우|
|delete|코드 삭제|
|test|테스트코드 생성, 수정 등 모든 테스트코드|
|doc|문서 수정에 대한 작업|
|fix|버그 수정|

<br>

## **Commit Convention**

- #{issue number}/{types}/작업한 사항(띄어쓰기 허용)
- ex ```[#1]/feat/게시판 조회 기능 추가```

### types

|type|description|
|------|---|
|feat|새로운 기능 추가|
|modify|코드 수정 ⇒ 기능상에 수정이 있는 경우|
|refactor|기능상의 수정이 없이 코드 품질만 올렸을 경우|
|delete|코드 삭제|
|test|테스트코드 생성, 수정 등 모든 테스트코드|
|doc|문서 수정에 대한 작업|
|fix|버그 수정|


<br>

## **Commit Prepare**

```bash
cp ./scripts/prepare-commit-msg.sh ./.git/hooks/prepare-commit-msg

chmod ug+x ./.git/hooks/prepare-commit-msg
```

