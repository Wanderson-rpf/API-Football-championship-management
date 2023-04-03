SELECT
    m.id as ID_match,
    m.home_team_id,
    t.id,
    t.team_name,
    m.home_team_goals,
    IF(
        m.home_team_goals > m.away_team_goals,
        "winner",
        "loss"
    ) as status
FROM teams t
    INNER JOIN matches m ON t.id = m.home_team_id
GROUP BY t.team_name, m.id
ORDER BY t.team_name;

----------------------------------------------------------------------------

-- GOALS

-- Em casa

SELECT
    SUM(m.home_team_goals) as goalsFavor
FROM matches m
WHERE
    m.in_progress = 0
    AND m.home_team_id = 1;

-- Como visitante

SELECT
    SUM(m.away_team_goals) as goalsFavor
FROM matches m
WHERE
    m.in_progress = 0
    AND m.away_team_id = 1;

------------------------------------------------------

-- Em casa

SELECT
    SUM(m.away_team_goals) as goalsOwn
FROM matches m
WHERE
    m.in_progress = 0
    AND m.home_team_id = 1;

-- Como visitante

SELECT
    SUM(m.home_team_goals) as goalsOwn
FROM matches m
WHERE
    m.in_progress = 0
    AND m.away_team_id = 1;

------------------------------------------------------

Winners
SELECT
    COUNT(
        m.home_team_goals > m.away_team_goals
    ) as Winners
FROM matches m
WHERE
    m.in_progress = 0
    AND m.home_team_goals > m.away_team_goals
    AND m.home_team_id = 12;

SELECT m.*
FROM matches m
WHERE
    m.in_progress = 0
    AND m.home_team_goals > m.away_team_goals
    AND m.home_team_id = 12;

------------------------------------------------------