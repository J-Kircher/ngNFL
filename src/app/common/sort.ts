import { ITeam } from '@app/model/nfl.model';

export function sortDivision(t1: ITeam, t2: ITeam): number {
  if (t1.pct < t2.pct) {
    return 1;
  } else {
    if (t1.pct > t2.pct) {
      return -1;
    } else {
      if (t1.wins < t2.wins) {
        return 1;
      } else {
        if (t1.wins > t2.wins) {
          return -1;
        } else {
          if (t1.losses > t2.losses) {
            return 1;
          } else {
            if (t1.losses < t2.losses) {
              return -1;
            } else {
              if (t1.divwins < t2.divwins) {
                return 1;
              } else {
                if (t1.divwins > t2.divwins) {
                  return -1;
                } else {
                  if (t1.divlosses > t2.divlosses) {
                    return 1;
                  } else {
                    if (t1.divlosses < t2.divlosses) {
                      return -1;
                    } else {
                      if (t1.confwins < t2.confwins) {
                        return 1;
                      } else {
                        if (t1.confwins > t2.confwins) {
                          return -1;
                        } else {
                          if (t1.conflosses > t2.conflosses) {
                            return 1;
                          } else {
                            if (t1.conflosses < t2.conflosses) {
                              return -1;
                            } else {
                              if (t1.pf - t1.pa < t2.pf - t2.pa) {
                                return 1;
                              } else {
                                if (t1.pf - t1.pa > t2.pf - t2.pa) {
                                  return -1;
                                } else {
                                  if (t1.pf < t2.pf) {
                                    return 1;
                                  } else {
                                    if (t1.pf > t2.pf) {
                                      return -1;
                                    } else {
                                      if (t1.pa > t2.pa) {
                                        return 1;
                                      } else {
                                        if (t1.pa < t2.pa) {
                                          return -1;
                                        } else {
                                          return 0;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

export function sortDivisionByTotal(t1: ITeam, t2: ITeam) {
  if (t1.total < t2.total) {
    return 1;
  } else {
    if (t1.total > t2.total) {
      return -1;
    } else {
      return 0;
    }
  }
}

export function sortConference(t1: ITeam, t2: ITeam): number {
  if (t1.pct < t2.pct) {
    return 1;
  } else {
    if (t1.pct > t2.pct) {
      return -1;
    } else {
      if (t1.wins < t2.wins) {
        return 1;
      } else {
        if (t1.wins > t2.wins) {
          return -1;
        } else {
          if (t1.losses > t2.losses) {
            return 1;
          } else {
            if (t1.losses < t2.losses) {
              return -1;
            } else {
              if (t1.confwins < t2.confwins) {
                return 1;
              } else {
                if (t1.confwins > t2.confwins) {
                  return -1;
                } else {
                  if (t1.conflosses > t2.conflosses) {
                    return 1;
                  } else {
                    if (t1.conflosses < t2.conflosses) {
                      return -1;
                    } else {
                      if (t1.pf - t1.pa < t2.pf - t2.pa) {
                        return 1;
                      } else {
                        if (t1.pf - t1.pa > t2.pf - t2.pa) {
                          return -1;
                        } else {
                          if (t1.pf < t2.pf) {
                            return 1;
                          } else {
                            if (t1.pf > t2.pf) {
                              return -1;
                            } else {
                              if (t1.pa > t2.pa) {
                                return 1;
                              } else {
                                if (t1.pa < t2.pa) {
                                  return -1;
                                } else {
                                  return 0;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
