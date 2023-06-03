# **Garden Of writer Server**

## **Scripts**

```bash
# local debug environment
npm run start:debug

# local development environment
npm run start:local

# deploy development environment
npm run start:dev

# deploy production environment
npm run start:prod
```

<br>

## **Branch Strategy**

| branch              | description                |
| ------------------- | -------------------------- |
| main                | 메인 저장소                |
| release             | 상용 환경에 배포 될 브랜치 |
| dev                 | 개발 환경에 배포 될 브랜치 |
| feat/{feature-name} | 기능 브랜치                |

<br>

## **Branch Naming Convention**

**이슈 생성 시 자동으로 브랜치가 생성됩니다.**
**이슈 생성 시 `Assignees`, `Labels`, `Project` 꼭 설정해주세요**
<img width="909" alt="image" src="https://github.com/GardenOfWriter/garden-of-writer-backend/assets/46591459/37b2d7d4-8ffa-4299-a9cf-e05c25da67c2">

>

- #{label}/issue-{issueNumber}/{issueTitle}
  - issue title 로 branch 명이 생성되니 영문으로 짧게 작성 후 본문에 내용 채워주세요
  - Branch 명으로 적절하지 않은 문자(공백)는 `_`로 처리됩니다.
  - ex `doc/issue-1/github_template`

### label

| label    | description                                  |
| -------- | -------------------------------------------- |
| feat     | 새로운 기능 추가                             |
| modify   | 코드 수정 ⇒ 기능상에 수정이 있는 경우        |
| refactor | 기능상의 수정이 없이 코드 품질만 올렸을 경우 |
| delete   | 코드 삭제                                    |
| test     | 테스트코드 생성, 수정 등 모든 테스트코드     |
| doc      | 문서 수정에 대한 작업                        |
| fix      | 버그 수정                                    |

<br>

## **Commit Convention**

- [#{issue number}]/{types}: 작업한 사항(띄어쓰기 허용)
- ex `[#1]/feat: 게시판 조회 기능 추가`

### types

| type     | description                                  |
| -------- | -------------------------------------------- |
| feat     | 새로운 기능 추가                             |
| modify   | 코드 수정 ⇒ 기능상에 수정이 있는 경우        |
| refactor | 기능상의 수정이 없이 코드 품질만 올렸을 경우 |
| delete   | 코드 삭제                                    |
| test     | 테스트코드 생성, 수정 등 모든 테스트코드     |
| doc      | 문서 수정에 대한 작업                        |
| fix      | 버그 수정                                    |

<br>

### **Commit Prepare**

```bash
cp ./scripts/prepare-commit-msg.sh ./.git/hooks/prepare-commit-msg

chmod ug+x ./.git/hooks/prepare-commit-msg
```

### **Commit Template**

```bash
# 커밋 템플릿 적용
git config --local commit.template .COMMIT_TEMPLATE.txt

# 전역으로 설정하려면 --local 을 --global 로 적용하면 됩니다.
# 커밋 에디터 vscode 로 적용
git config --local core.editor "code --wait"
```

<br>

## **Infisical**

### Initialize

- **[infisical cli](https://infisical.com/docs/documentation/getting-started/cli)**

```bash
# install
brew install infisical/get-cli/infisical

# login
infisical login

# project set
infisical init
```

### scripts

- **[infisical cli](https://infisical.com/docs/cli/commands/export)**

```bash
# dev
infisical export --env=dev > .env.dev

# prod
infisical export --env=prod > .env.prod
```
